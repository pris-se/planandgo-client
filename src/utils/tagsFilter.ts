export const tagsFilter = (text:string) => {    
    const array = text.trim().toLowerCase().split(' ')    
    const hashtags = array.filter(e => e.startsWith("#") && e.length > 1)    
    const uniqueHastags = hashtags.filter((e, i, array) => array.indexOf(e) === i);
    return uniqueHastags
}