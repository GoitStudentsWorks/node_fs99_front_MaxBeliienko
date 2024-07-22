import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Iconsvg from '../Icon';
import styles from './WaterForm.module.css';

const timeSchema = /^([01]\d|2[0-3]):([0-5]\d)$/;
const validationSchema = Yup.object().shape({
  volume: Yup.number().min(0).max(5000).integer(),
  time: Yup.string()
    .matches(timeSchema, 'Time must be in hh:mm format')
    .required('Required'),
});

const WaterForm = () => {
  const [waterAmount, setWaterAmount] = useState(50);

  const getTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      volume: waterAmount,
      time: getTime(),
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setValue('volume', waterAmount);
  }, [waterAmount, setValue]);

  const handleWaterBtnMinus = () => {
    setWaterAmount(prevWaterAmount => Math.max(prevWaterAmount - 50, 0));
  };
  const handleWaterBtnPlus = () => {
    setWaterAmount(prevWaterAmount => Math.min(prevWaterAmount + 50, 5000));
  };

  const handleRegistration = data => console.log(data);

  const handleWater = e => {
    const { value } = e.target;
    if (value === '') {
      setWaterAmount(0);
    } else {
      if (parseInt(value) > 5000 || parseInt(value) < 0) {
        console.log('Amount of water could be from interwal [0,5000]');
      } else {
        setWaterAmount(parseInt(value));
      }
    }
  };

  return (
    <>
      <p className={styles.biggerText}>Choose a value:</p>
      <p className={styles.smallerText}>Amount of water:</p>
      <div className={styles.amount}>
        <button
          type="button"
          className={styles.waterBtn}
          onClick={handleWaterBtnMinus}
          disabled={waterAmount < 50 || waterAmount === ''}
        >
          <Iconsvg
            width={40}
            height={40}
            iconName={'minus'}
            styles={'minusBtn'}
          />
        </button>
        <div className={styles.amountValue}>{waterAmount} ml</div>
        <button
          type="button"
          className={styles.waterBtn}
          onClick={handleWaterBtnPlus}
          disabled={waterAmount > 4950}
        >
          <Iconsvg
            width={40}
            height={40}
            iconName={'plus'}
            styles={'plusBtn'}
          />
        </button>
      </div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <p className={styles.smallerText}>Recording time:</p>
        <input
          type="text"
          name="time"
          {...register('time')}
          className={styles.input}
        />
        <small className={styles.textDanger}>
          {errors?.time && errors.time.message}
        </small>
        <p className={styles.biggerText}>Enter the value of the water used:</p>
        <input
          name="volume"
          {...register('volume')}
          value={waterAmount}
          onChange={handleWater}
          className={styles.input}
        />
        <small className={styles.textDanger}>
          {errors?.volume && errors.volume.message}
        </small>
        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
      </form>
    </>
  );
};

export default WaterForm;
