import capitalize from "./Capitalize";

const formatSource =  (word) => {
    if (word.includes('_')) {
        const split = word.split('_');
        return capitalize(split[0]) + " " + capitalize(split[1]);
    }
    return capitalize(word);
}

export default formatSource