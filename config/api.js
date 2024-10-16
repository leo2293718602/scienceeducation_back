// 引入数据库连接配置
var models = require('./db');
// 引入express包
var express = require('express');
 
//创建路由器对象
var router = express.Router();
// 引入mysql包
var mysql = require('mysql');
 
// 格式化时间模块Silly-datetime
var datetime = require('silly-datetime');
 
var fs = require('fs');
var path = require('path')
 
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
 
// 设置返回response
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        console.log('ret', ret)
        res.json(ret);
    }
};
 


 
// 下面是api路由的代码,在下方添加额外的接口
router.get('/xxx', (req, res) => {
    // ...
})
 
router.post('/hello', (req, res) => {
    // ...
	jsonWrite(res, {
		code: 200,
		msg: "Hello World!"
	})
})

router.get('/getArticleList', (req, res) => {
	conn.query("select * from articles", function(err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
})

router.get('/getCenterdynamicsList', (req, res) => {
	conn.query("select * from centerdynamics", function(err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
})

router.get('/getGreatcasesList', (req, res) => {
	conn.query("select * from greatcases", function(err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
})

router.get('/getReleaseList', (req, res) => {
	conn.query("select * from releases", function(err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
})

router.get('/getTeacherList', (req, res) => {
	conn.query("select * from teachers", function(err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
})

router.get('/getNoticesList', (req, res) => {
     conn.query("select * from notices", function(err, result) {
		 if (err) {
			 console.log(err);
		 }
		 if (result) {
			 jsonWrite(res, result);
		 }
	 })
})

router.get('/getVideosList', (req, res) => {
     conn.query("select * from videos", function(err, result) {
		 if (err) {
			 console.log(err);
		 }
		 if (result) {
			 jsonWrite(res, result);
		 }
	 });	
})
router.post('/likeVideo', (req, res) => {
	const {id} =req.body;
	conn.query ("select * from videos where id = ?", [id], function(err, result) {
		if(err) {
			console.log(err);
			res.status(500).send('Error retrieving data from database');
			return;
		}

		if (result.length > 0) {
			const video =result[0];
			conn.query("update videos set liked = ? where id = ?", [video.liked + 1, id], function(err, updateResult) {
				if (err) {
					console.log(err);
					res.status(500).send('Error updating data in database');
					return;
				}
				res.status(200).send('Update successfully');
			});
		}else{
			res.status(404).send('Video not found');
		}
	})
  });


  router.post('/unlikeVideo', (req, res) => {
	const {id} =req.body;
	conn.query ("select * from videos where id = ?", [id], function(err, result) {
		if(err) {
			console.log(err);
			res.status(500).send('Error retrieving data from database');
			return;
		}

		if (result.length > 0) {
			const video =result[0];
			conn.query("update videos set liked = ? where id = ?", [video.liked - 1, id], function(err, updateResult) {
				if (err) {
					console.log(err);
					res.status(500).send('Error updating data in database');
					return;
				}
				res.status(200).send('Update successfully');
			});
		}else{
			res.status(404).send('Video not found');
		}
	})
  });
  router.post('/increaseVideoWatch', (req, res) => {
    const {id} =req.body;
	conn.query ("select * from videos where id = ?", [id], function(err, result) {
		if(err) {
			console.log(err);
			res.status(500).send('Error retrieving data from database');
			return;
		}

		if (result.length > 0) {
			const video =result[0];
			conn.query("update videos set watched = ? where id = ?", [video.watched + 1, id], function(err, updateResult) {
				if (err) {
					console.log(err);
					res.status(500).send('Error updating data in database');
					return;
				}
				res.status(200).send('Update successfully');
			});
		}else{
			res.status(404).send('Video not found');
		}
	})
  });


// router.post('/getArticleById', (req, res) => {
// 	console.log(req,'-------req-----');
// 	let params = req.body;
// 	conn.query("select * from articles where id = ?", [params.id], function(err, result) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		if (result) {
// 			jsonWrite(res, result);
// 		}
// 	})
// })

router.get('/getArticleById', (req, res) => {
    const id = req.query.id; // 从请求参数中获取文章ID
    if (!id) {
        res.status(400).send('ID is required');
        return;
    }

    conn.query("SELECT * FROM articles WHERE id = ?", [id], function(err, result) {
        if (err) {
            console.error('Error retrieving article from database:', err);
            res.status(500).send('Error retrieving article from database');
            return;
        }

        if (result.length > 0) {
            res.status(200).json(result[0]); // 返回查询到的文章
        } else {
            res.status(404).send('Article not found');
        }
    });
});


router.post('/increaseWatch', (req, res) => {
    const {id} =req.body;
	conn.query ("select * from articles where id = ?", [id], function(err, result) {
		if(err) {
			console.log(err);
			res.status(500).send('Error retrieving data from database');
			return;
		}

		if (result.length > 0) {
			const article =result[0];
			conn.query("update articles set watched = ? where id = ?", [article.watched + 1, id], function(err, updateResult) {
				if (err) {
					console.log(err);
					res.status(500).send('Error updating data in database');
					return;
				}
				res.status(200).send('Update successfully');
			});
		}else{
			res.status(404).send('Article not found');
		}
	})
  });

router.get('/gettrannoticesList', (req, res) => {
	conn.query("select * from trannotices", function(err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
})

router.get('/getdownloadsList', (req, res) => {
	conn.query("select * from downloads", function(err, result) {
		if (err) {
			console.log(err);
		}
		if (result) {
			jsonWrite(res, result);
		}
	})
})

router.post('/saveArticle', (req, res) => {
    const { title, context, author, text, cover, img1, img2, fromwhere} = req.body;
    
    if (!title || !context || !author || !text || !cover || !img1 || !img2 || !fromwhere) {
        return res.status(400).send('Missing required fields');
    }

    const query = 'INSERT INTO articles (title, context, author, text, cover, img1, img2, fromwhere, date, watched) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0)';
    const values = [title, context, author, text, cover, img1, img2, fromwhere];

    conn.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error saving article');
        }
        res.status(201).send('Article saved successfully');
    });
});

router.post('/adminLogin', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Missing required fields');
    }

    const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    const values = [username, password];

    conn.query(query, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error logging in');
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

// 导出路由对象
module.exports = router;


