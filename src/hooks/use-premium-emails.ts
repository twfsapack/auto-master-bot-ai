
// Lista de correos con acceso premium
const premiumEmails = ["tecnoworldfuture@gmail.com", "trucktruest@yahoo.com"];

export const usePremiumEmails = () => {
  const isPremiumEmail = (email: string): boolean => {
    return premiumEmails.includes(email);
  };

  const addPremiumEmail = (email: string): boolean => {
    if (!premiumEmails.includes(email)) {
      premiumEmails.push(email);
      return true;
    }
    return false;
  };

  return {
    isPremiumEmail,
    addPremiumEmail,
    premiumEmails
  };
};
