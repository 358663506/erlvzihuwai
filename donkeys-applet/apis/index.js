import {
	httpRequest,
	httpTokenRequest,
} from "@/common/request.js";

/* 获取轮播图 */
export const getSliderImages = () => {
	return httpRequest({
		url: "applets-api/applets/open/carousel/list",
		method: "get",
	});
};
/* 搜索 */
export const searchApi = (data = {}) => {
	return httpRequest({
		url: "applets-api/applets/open/post_photo/search",
		method: "post",
		
	}, data);
};
/* 获取照片墙分类 */
export const getPhotoWallType = (data = {}) => {
	return httpRequest({
			url: "applets-api/applets/open/photoWallType/page",
			method: "post",
		},
		data
	);
};
/* 获取照片墙 */
export const getPhotoWall = (data = {}) => {
	return httpRequest({
			url: "applets-api/applets/open/photoWall/page",
			method: "post",
		},
		data
	);
};
/* 获取文章 */
export const getPostPage = (data = {}) => {
	return httpRequest({
			url: "applets-api/applets/open/post/page",
			method: "post",
		},
		data
	);
};
/* 获取文章详情 */
export const getPostInfo = (data = {}) => {
	return httpRequest({
			url: "applets-api/applets/open/post/info",
			method: "post",
		},
		data
	);
};
/* 用户信息 */
export const infoUser = () => {
	return httpTokenRequest({
		url: "applets-api/applets/comm/user/info",
		method: "post",
	}, );
};
/* 发布文章 */
export const addPost = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/post/add",
			method: "post",
		},
		data
	);
};
/* 修改文章 */
export const updatePost = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/post/update",
			method: "post",
		},
		data
	);
};
/* 修改文章状态 */
export const updatePostStatus = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/post/status",
			method: "post",
		},
		data
	);
};
/* 修改置顶状态 */
export const updatePostTop = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/post/top",
			method: "post",
		},
		data
	);
};
/* 查询收藏 */
export const infoCollect = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/collect/info",
			method: "post",
		},
		data
	);
};
/* 收藏 */
export const addCollect = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/collect/add",
			method: "post",
		},
		data
	);
};
/* 取消收藏 */
export const deleteCollect = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/collect/delete",
			method: "post",
		},
		data
	);
};
/* 收藏分页 */
export const pageCollect = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/collect/page",
			method: "post",
		},
		data
	);
};
/* 足迹分页 */
export const pageHistory = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/history/page",
			method: "post",
		},
		data
	);
};

/* 回复 */
export const addReply = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/reply/add",
			method: "post",
		},
		data
	);
};

/* 删除文章 */
export const deletePost = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/post/delete",
			method: "post",
		},
		data
	);
};

/* 删除回复 */
export const deleteReply = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/reply/delete",
			method: "post",
		},
		data
	);
};

/* 查询回复 */
export const getReplyPage = (data = {}) => {
	return httpRequest({
			url: "applets-api/applets/open/reply/page",
			method: "post",
		},
		data
	);
};

/**
 * 上传文件的配置
 */
export const uploadConf = (data) => {
	return httpTokenRequest({
			url: `applets-api/applets/comm/upload?fileName=${data.fileName}&folder=TEMPORARY`,
			method: "post",
		},
		data
	);
}

/**
 * 上传文件
 */
export const upload = (data) => {
	return new Promise((resolve, reject) => {
		let uploadData = data.uploadData
		var uploadTask = wx.uploadFile({
			url: data.uploadUrl,
			filePath: data.img,
			name: uploadData.fileKey,
			formData: {
				'token': uploadData.token,
				'key': uploadData.key
			},
			success: resolve,
			fail: () => {
				reject()
				uni.showToast({
					title: "图片上传失败"
				})
			} 
		})
		// 文件上传进度
		// uploadTask.onProgressUpdate((res) => {
		// 	progress && progress(res)
		// })
	})
}


export const imgUpload = (imgPath, path = 'image') => {
	return new Promise(async (resolve, reject) => {
		try{
			let fileNameArr = imgPath
				.split('.')
			let lastName = fileNameArr[
				fileNameArr
				.length - 1]
			let type =
				`${path}/${lastName}`
			let result =
				await uploadConf({
					fileName: 'applets.' +
						lastName
				})
			let config = result.data
			await upload({
				...config,
				img: imgPath
			})
			resolve(config.publicUrl)
		}catch(e){
			uni.showToast({
				title: "图片上传失败"
			})
			reject()
		}
		
	})
}

/* 刷新 token */
export const refreshToken = (data) => {
	return httpTokenRequest({
			url: `applets-api/applets/open/refreshToken?refreshToken=${data.refreshToken}`,
			method: "post",
		},
		data
	);
}
// 获取协议
export const getAgreementInfo = (data = {}) => {
	return httpTokenRequest({
			url: "applets-api/applets/comm/agreement/info",
			method: "post",
		},
		data
	);
};
// 添加签名
export const addAutograph = (data = {}) => {
	return httpTokenRequest({
		url: "applets-api/applets/comm/autograph/add",
		method: "post",
	},
	data
	);
}
// 获取签名
export const getAutographInfo = (data = {}) => {
	return httpTokenRequest({
		url: "applets-api/applets/comm/autograph/info",
		method: "post",
	},
		data
	);
}
// 更新签名
export const updateAutograph = (data = {}) => {
	return httpTokenRequest({
		url: "applets-api/applets/comm/autograph/update",
		method: "post",
	},
		data
	);
}

 // 报名参加
 export const signUpAdd = (data = {}) => {
 	return httpTokenRequest({
 		url: "enrollUser/add",
 		method: "post",
 	},
 		data
 	);
 }

  // 获取信息
  export const signUpInfo = (data = {}) => {
	return httpTokenRequest({
		url: "enrollUser/info",
		method: "post",
	},
		data
	);
}

  // 获取信息
  export const getByEnrollId = (data = {}) => {
	return httpTokenRequest({
		url: "enrollUser/getByEnrollId",
		method: "get",
	},
		data
	);
}

  // 上下车
  export const postStatus = (data = {}) => {
	return httpTokenRequest({
		url: "enrollUser/post/status",
		method: "post",
	},
		data
	);
}

  // 上下车
  export const signUpAddUpdate = (data = {}) => {
	return httpTokenRequest({
		url: "enrollUser/update",
		method: "post",
	},
		data
	);
}

  // 获取上车点
  export const musterAdressPage = (data = {}) => {
	return httpTokenRequest({
		url: "musterAdress/page",
		method: "post",
	},
		data
	);
}