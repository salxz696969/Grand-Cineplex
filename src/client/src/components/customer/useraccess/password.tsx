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
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded">
      <FaLock className="text-gray-400 mr-3" />
      <input type={isShowPassword ? "text" : "password"} className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none text-white" value={value} onChange={onChange}/>
      {isShowPassword ? (
        <FaRegEye size={22} className="cursor-pointer text-blue-800" onClick={toggleShowPassword}/>
      ) : (
        <FaRegEyeSlash size={22} className="cursor-pointer text-slate-400" onClick={toggleShowPassword}/>
      )}
    </div>
  );
};

export default Password;
