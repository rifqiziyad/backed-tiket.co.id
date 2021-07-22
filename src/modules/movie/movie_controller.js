const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')
const client = require('../../config/redis')
const fs = require('fs')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query
      if (page === undefined) {
        page = 1
      }
      if (limit === undefined) {
        limit = 4
      }
      if (search === undefined) {
        search = ''
      }
      if (sort === undefined) {
        sort = 'movie_id ASC'
      }
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount(search)
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(limit, offset, search, sort)
      client.setex(
        `getmovie:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
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
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Succes Get Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, 'Data By Id Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      const {
        movieName,
        movieDirector,
        movieReleaseDate,
        movieCategory,
        movieCasts,
        durationHour,
        durationMinute,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_release_date: movieReleaseDate,
        movie_category: movieCategory,
        directed: movieDirector,
        casts: movieCasts,
        duration_hour: durationHour,
        duration_minute: durationMinute,
        synopsis: movieSynopsis,
        movie_image: req.file ? req.file.filename : ''
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
      // proses untuk me-delete file lama
      const {
        movieName,
        movieDirector,
        movieReleaseDate,
        movieCategory,
        movieCasts,
        durationHour,
        durationMinute,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        casts: movieCasts,
        duration_hour: durationHour,
        duration_minute: durationMinute,
        synopsis: movieSynopsis,
        directed: movieDirector,
        movie_image: req.file ? req.file.filename : '',
        movie_updated_at: new Date(Date.now())
      }
      const checkId = await movieModel.getDataById(id)
      const result = await movieModel.updateData(setData, id)
      if (checkId.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))

        const imageToDelete = checkId[0].movie_image
        const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

        if (isImageExist && imageToDelete) {
          fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
            if (err) throw err
          })
        }
        return helper.response(
          res,
          200,
          `Succes Update Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      // 1. buat request di post
      // 2. set up controller dan model
      // 3. me-delete data yg ada di dalam folder uploads fs.unlink
      const { id } = req.params
      const checkId = await movieModel.getDataById(id)
      const result = await movieModel.deleteData(id)
      // kondisi cek data di dalam database ada berdasarkan id..
      if (checkId.length > 0) {
        fs.stat(`src/uploads/${checkId[0].movie_image}`, function (err, stats) {
          // console.log(stats) // here we got all information of file in stats variable
          if (err) {
            return console.error(err)
          }
          fs.unlink(`src/uploads/${checkId[0].movie_image}`, function (err) {
            if (err) return console.log(err)
            console.log('file deleted successfully')
          })
        })
        // hasil response untuk delete id yg ke delete saja
        return helper.response(
          res,
          200,
          `Succes Delete Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data By Id = ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
