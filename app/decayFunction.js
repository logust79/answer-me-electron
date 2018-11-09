/* A decay function of number of events and length of time in milliseconds */
const initialWindow = 1; // minutes
export default x => (initialWindow * 60 * 1000) / x;
