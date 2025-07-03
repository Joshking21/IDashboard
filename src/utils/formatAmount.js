export function formatAmount(amount) {
    const num = Number(amount)
    
    if (isNaN(num)) return amount

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1_000_000)     return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000)         return num.toLocaleString(); // adds commas

    return num.toString()
}