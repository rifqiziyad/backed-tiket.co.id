const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(limit, offset, search, sort)
      return helper.response(res, 200, 'Succes Get Data', result, pageInfo)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      console.log(req.params)
      const result = await movieModel.getDataById(id)
      // kondisi cek data di dalam database ada berdasarkan id..
      console.log(result)
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By Id Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      console.log(req.body)
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate
      }
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi cek data di dalam database ada berdasarkan id..
      console.log(req.body)
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_update_at: new Date(Date.now())
      }
      const result = await movieModel.updateData(setData, id)
      return helper.response(res, 200, 'Succes Update Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      // 1. buat request di post
      // 2. set up controller dan model
      const { id } = req.params
      const checkId = await movieModel.getDataById(id)
      const result = await movieModel.deleteData(id)
      console.log(result)
      // kondisi cek data di dalam database ada berdasarkan id..
      if (checkId.length > 0) {
        // hasil response untuk delete id yg ke delete saja
        return helper.response(res, 200, 'Succes Delete Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By Id Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
  // getMovieByName: async (req, res) => {
  //   try {
  //     // console.log(req.query)
  //     const { name } = req.query
  //     const result = await movieModel.getDataByName(name)
  //     console.log(result)
  //     if (name) {
  //       return helper.response(res, 200, 'Succes Get Data By Name', result)
  //     } else {
  //       return helper.response(res, 404, 'Data By Name Not Found', null)
  //     }
  //   } catch (error) {
  //     return helper.response(res, 400, 'Bad Request', error)
  //   }
  // }
}
