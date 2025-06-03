
/**
 * In-memory list of emails with premium access.
 * Note: This is a mock implementation and would typically be replaced by a backend check.
 * @type {string[]}
 */
const premiumEmails = ["tecnoworldfuture@gmail.com", "trucktruest@yahoo.com"];

/**
 * Custom hook to manage a list of premium email addresses.
 * This is a mock implementation for demonstration purposes. In a real application,
 * premium status would be determined by a backend service and user authentication state.
 *
 * @returns {object} An object containing functions to interact with the premium email list.
 * @property {(email: string) => boolean} isPremiumEmail - Checks if a given email has premium access.
 * @property {(email: string) => boolean} addPremiumEmail - Adds an email to the premium list. Returns true if added, false if already present.
 * @property {string[]} premiumEmails - The current list of premium emails. (Primarily for debugging/demonstration in this mock setup)
 */
export const usePremiumEmails = () => {
  /**
   * Checks if the provided email is in the list of premium emails.
   * @param {string} email - The email to check.
   * @returns {boolean} True if the email has premium access, false otherwise.
   */
  const isPremiumEmail = (email: string): boolean => {
    return premiumEmails.includes(email);
  };

  /**
   * Adds an email to the list of premium emails if not already present.
   * @param {string} email - The email to add.
   * @returns {boolean} True if the email was successfully added, false if it was already in the list.
   */
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
    premiumEmails // Exposing the list itself, usually not done in production systems this way
  };
};
