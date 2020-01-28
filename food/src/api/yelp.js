import axios from 'axios'

export default axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers: {
        Authorization: 'Bearer yOCR2r8Am1B0lea9b1mom3byXfx7ghfi4VyqQwpPzze3ZpvxuGAQir1n6ea1JxeB271rdVp9UH1-FZzCrQZLg1_Kp2FMVvt4BAfRXGaHtGmlb_OyJ__CgPma5ggvXnYx'
    }
});

