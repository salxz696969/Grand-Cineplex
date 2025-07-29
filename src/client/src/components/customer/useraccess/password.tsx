import { useState, ChangeEvent } from "react";
import { FaRegEye, FaRegEyeSlash, FaLock } from "react-icons/fa";

interface PasswordProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Password: React.FC<PasswordProps> = ({ value, onChange }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-gray-900 border border-gray-800 rounded-xl px-5">
      <FaLock className="text-gray-400 mr-3" />
      <input type={isShowPassword ? "text" : "password"} className="w-full text-sm bg-transparent py-3 mr-3 rounded-xl outline-none text-white placeholder:text-gray-500" value={value} onChange={onChange} />
      {isShowPassword ? (
        <FaRegEye size={22} className="cursor-pointer text-blue-800 hover:text-blue-700 transition-colors" onClick={toggleShowPassword} />
      ) : (
        <FaRegEyeSlash size={22} className="cursor-pointer text-gray-500 hover:text-blue-700 transition-colors" onClick={toggleShowPassword} />
      )}
    </div>
  );
};

export default Password;
