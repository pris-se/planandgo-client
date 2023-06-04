<<<<<<< HEAD

export const tagsFilter = (text:string) => {    
    const array = text.trim().toLowerCase().split(' ')
    console.log();
        
    const hashtags = array.filter(e => e.startsWith("#") && e.length > 1)    
    const uniqueHastags = hashtags.filter((e, i, array) => array.indexOf(e) === i);
    const modifiedTags = uniqueHastags.map(e => e.replace('#', ''))
    return modifiedTags;
}

export const addTagLink = (text: string) => {
    const array = text.trim().split(' ');
    const textWithLinks = array.map((e) => {
        if(e.startsWith("#")) {
            return (
                {
                    string: e,
                    link: e.replace("#", "")
                }
            )
        } else {
            return {
                string: e,
                link: null
            }       
        }
    })
    return textWithLinks
=======
export const tagsFilter = (text:string) => {    
    const array = text.trim().toLowerCase().split(' ')    
    const hashtags = array.filter(e => e.startsWith("#") && e.length > 1)    
    const uniqueHastags = hashtags.filter((e, i, array) => array.indexOf(e) === i);
    return uniqueHastags
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
}