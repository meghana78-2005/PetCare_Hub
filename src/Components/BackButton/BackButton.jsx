import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = ({ 
  to = null, 
  label = "Back", 
  className = "",
  style = {},
  onClick = null 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back to previous page by default
    }
  };

  return (
    <button
      className={`back-button ${className}`}
      onClick={handleClick}
      style={{
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ...style
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#5a6268';
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = '#6c757d';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <span style={{ fontSize: '16px' }}>«</span>
      {label}
    </button>
  );
};

export default BackButton;
