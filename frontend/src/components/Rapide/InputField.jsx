
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FaBox, FaWeightHanging, FaRulerCombined, FaMoneyBillWave, FaPhone, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCommentDots, FaInfoCircle
} from 'react-icons/fa';

const iconMap = {
  nomColis: FaBox,
  typeColis: FaBox,
  nombreColis: FaBox,
  poids: FaWeightHanging,
  dimensions: FaRulerCombined,
  valeurColis: FaMoneyBillWave,
  nomDest: FaUser,
  numDest: FaPhone,
  adresseDest: FaMapMarkerAlt,
  nomExp: FaUser,
  numExp: FaPhone,
  adresseExp: FaMapMarkerAlt,
  dateLivraison: FaCalendarAlt,
  heureLivraison: FaClock,
  instructions: FaCommentDots
};

const InputField = ({ label, name, value, onChange, placeholder, type = 'text', required = false, error, min, className = '', children, disabled }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const Icon = iconMap[name];

  useEffect(() => {
    // Synchronize displayValue with the parent's value prop
    if (type === 'tel') {
      const formatted = formatPhoneNumber(value);
      setDisplayValue(formatted);
    } else {
      setDisplayValue(value);
    }
  }, [value, type]);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    let input = phoneNumber.replace(/\D/g, ''); // Ne garde que les chiffres
    let formatted = '';

    if (input.length > 0) {
      formatted += input.substring(0, 2);
    }
    if (input.length > 2) {
      formatted += ' ' + input.substring(2, 5);
    }
    if (input.length > 5) {
      formatted += ' ' + input.substring(5, 8);
    }
    if (input.length > 8) {
      formatted += ' ' + input.substring(8, 10);
    }
    if (input.length > 10) {
      formatted += ' ' + input.substring(10, 12);
    }
    return formatted;
  };

  const handlePhoneChange = (e) => {
    const rawInput = e.target.value.replace(/\D/g, '');
    const formattedInput = formatPhoneNumber(rawInput);
    setDisplayValue(formattedInput);
    
    // Pass the raw digits to the parent component
    onChange({ target: { name, value: rawInput } });
  };

  const handleNumberChange = (e) => {
    const input = e.target.value;
    if (input === '' || /^[0-9]*\.?[0-9]*$/.test(input)) {
      setDisplayValue(input);
      onChange(e);
    }
  };

  const wrapperVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 } },
  };

  const inputVariants = {
    rest: { scale: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)", borderColor: "rgb(209, 213, 219)" },
    hover: { scale: 1.01, boxShadow: "0 8px 20px rgba(139, 92, 246, 0.15)", borderColor: "rgb(139, 92, 246)" },
    focus: { scale: 1, boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.3), 0 8px 20px rgba(139, 92, 246, 0.15)", borderColor: "rgb(139, 92, 246)" },
  };

  const baseInputClasses = `w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-200 ease-in-out`;
  const dynamicInputClasses = `${baseInputClasses} ${error ? 'border-red-500' : 'border-gray-300'} ${type === 'textarea' ? 'min-h-[100px] resize-y' : ''} ${className}`;

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      placeholder,
      required,
      className: `w-full bg-transparent border-none focus:outline-none ${type === 'select' ? 'py-3' : 'py-3 px-4'}`,
      disabled,
    };

    switch (type) {
      case 'textarea':
        return <textarea {...commonProps} value={value} onChange={onChange} className={`${commonProps.className} min-h-[100px] resize-y`} />;
      case 'select':
        return (
          <select {...commonProps} value={value} onChange={onChange} className={`${commonProps.className} cursor-pointer`}>
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {children}
          </select>
        );
      case 'tel':
        return <input {...commonProps} type="text" value={displayValue} onChange={handlePhoneChange} min={min} />;
      case 'number':
        return <input {...commonProps} type="text" value={displayValue} onChange={handleNumberChange} min={min} inputMode="numeric" pattern="[0-9]*" />;
      default:
        return <input {...commonProps} type={type} value={value} onChange={onChange} min={min} />;
    }
  };

  return (
    <motion.div
      className="flex flex-col w-full"
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-2">
        <motion.label
          htmlFor={name}
          className="flex items-center text-sm font-medium text-gray-700"
          animate={isFocused ? "focus" : "rest"}
        >
          {Icon && <Icon className="mr-2 text-purple-500" />}
          {label} {required && <span className="text-red-500">*</span>}
        </motion.label>
      </div>

      <motion.div
        className={`flex items-center rounded-xl overflow-hidden shadow-sm ${dynamicInputClasses}`}
        variants={inputVariants}
        whileHover="hover"
        whileTap="tap"
        animate={isFocused ? "focus" : "rest"}
      >
        {renderInput()}
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, x: -10 }}
            animate={{ opacity: 1, height: "auto", x: 0 }}
            exit={{ opacity: 0, height: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InputField;