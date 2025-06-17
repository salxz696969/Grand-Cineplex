// It checks if a string is in a valid email format EX: Jack21@gmail.com 
export const ValidateEmail= (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}