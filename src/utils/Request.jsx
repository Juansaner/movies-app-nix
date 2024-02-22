const key = import.meta.env.VITE_APP_IMDB_API_KEY

const requests =  {
    requestUpComing: '/movie/upcoming?api_key=' + key,
    requestTopRated: '/movie/top_rated?api_key=',
    requestPopular: '/movie/popular?api_key=' + key,
    requestNowPlaying: '/movie/now_playing?api_key=' + key,
    requestAiring: '/tv/airing_today?api_key=' + key,
    requestOnAir: '/tv/on_the_air?api_key=' + key,
    requestTvPopular: '/tv/popular?api_key=' + key,
    requestMovies: '/discover/movie',
    requestTv: '/discover/tv' ,
}
export default requests 