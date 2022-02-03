import { ethers } from "ethers";

const toBigNum = (amount, decimals) => {
    return ethers.utils.parseUnits(String(amount), decimals);
};

const fromBigNum = (amount, decimals) => {
    return Number(ethers.utils.formatUnits(amount, decimals));
};

export { toBigNum, fromBigNum };
