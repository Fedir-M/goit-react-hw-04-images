import s from './ToTop.module.css';

const ToTop = ({ onClick }) => {
  return (
    <button className={s.totopBtn} onClick={onClick}>
      ToTop
    </button>
  );
};

export default ToTop;
