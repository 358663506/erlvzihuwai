```javascript
<y-video-slide 
	video-height="calc(100vh - 44px)" 
	:data="videoData" 
	:videoIndex.sync="currentIndex"
	@refresh="refresh" 
	@loadMore="loadMore" 
	@share="share" 
	@fabulous="fabulous" 
	@follow="follow" 
	@commentFabulous="commentFabulous">
</y-video-slide>
```
### 属性说明

> video-height: 视频容器的高度
> 
> videoIndex:当前播放的视频下标
>
> data:视频列表数据
>
> @refresh：下拉刷新方法
>
> @loadMore：上拉加载方法
>
> @share：分享按钮方法
>
> @fabulous：视频点赞切换方法
>
> @follow：关注切换方法
>
> @commentFabulous：评论点赞切换方法

### data数据格式示例

```json
			[{
				id: '1',
        //是否关注
				isFollow:0,
        //是否点赞
				isFabulous:1,
        //用户昵称
				userNick:'',
				//用户头像        
        userHead:'',
        //视频描述信息
				videoContent:'',
        //点赞数量
				fabulousCount: 1,
        //评论数量
				commentCount:1000,
        //分享数量
				shareCount:499,
        //视频资源地址
				videoUrl: '',
        //视频封面图片地址
				posterUrl: '',
        //视频评论对象
				commentObj:{
          //评论总数
					count:520,
          //评论列表
					list:[{
            //用户头像
						userHead:'',
            //用户昵称
						userNick:'小二',
            //评论内容
						content:'',
            //评论时间
						time:'2021-05-06 15:34:44',
            //点赞数量
						fabulousCount:3737,
            //是否点赞
						isFabulous:1,
            //评论列表
						children:[{
              //被回复人
							replyTo:'小二',
              //用户头像
							userHead:'',
              //用户昵称
							userNick:'小三',
              //回复内容
							content:'',
              //回复时间
							time:'2021-05-06 15:34:44',
              //点赞数量
							fabulousCount:3737,
              //是否点赞
							isFabulous:0,
						}]
					}]
				}
			}]
```


### 示例文件

```vue
<template>
	<view class="content">
		<y-video-slide 
        video-height="100vh" :data="videoData" 
				@refresh="refresh" @loadMore="loadMore" @share="share" 
				@fabulous="fabulous" @follow="follow" @commentFabulous="commentFabulous"></y-video-slide>
	</view>
</template>
```
```javascript
<script>
export default {
	data() {
		return {
			videoData:[{
				id: '1',
				isFollow:0,
				isFabulous:1,
				userNick:'姚哥哥',
				videoContent:'这是一条测试这是一条测试这是一条测试这是一条测试这是一条测试这是一条测试这是一条测试这是一条测试这是一条测试',
				fabulousCount: 1,
				commentCount:1000,
				shareCount:499,
				videoUrl: 'https://v-cdn.zjol.com.cn/280443.mp4',
				posterUrl: 'https://img-my.csdn.net/uploads/201407/26/1406383299_1976.jpg',
				commentObj:{
					count:520,
					list:[{
						userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F4e%2Ff0%2F5e4ef0e451852e0114d75eac14f60924.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642669624&t=028d851350e18512dbf4bfe3a86cbfa4',
						userNick:'小二',
						content:'这是一条测试而已',
						time:'2021-05-06 15:34:44',
						fabulousCount:3737,
						isFabulous:1,
						children:[{
							replyTo:'小二',
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F3c%2F12%2F4c%2F3c124c5277386c897dad2977bb964ea1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670117&t=cd32b3baf24c5b3bba4c7516bb211bfe',
							userNick:'小三',
							content:'这是一条测试而已这是一条测试而已这是一条测试而已这是一条测试而已这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
							isFabulous:0,
						},{
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F1f%2F4f%2F53%2F1f4f53402015d7c738e68e7fdfa4877c.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670600&t=b0fbb15006c730305ec59bbfa55d18b9',
							replyTo:'小三',
							userNick:'小四',
							content:'这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
							isFabulous:0,
						}]
					}]
				},
				userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F39%2Fb7%2F53%2F39b75357f98675e2d6d5dcde1fb805a3.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642661023&t=dc2e75969d5509c28c65571534c2cf53'
			}, {
				id: '2',
				isFollow:1,
				isFabulous:0,
				userNick:'姚哥哥',
				videoContent:'这是一条测试',
				fabulousCount: 1,
				commentCount:1000,
				shareCount:499,
				videoUrl: 'https://v-cdn.zjol.com.cn/276982.mp4',
				commentObj:{
					count:100,
					list:[{
						userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F4e%2Ff0%2F5e4ef0e451852e0114d75eac14f60924.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642669624&t=028d851350e18512dbf4bfe3a86cbfa4',
						userNick:'小二',
						content:'这是一条测试而已',
						time:'2021-05-06 15:34:44',
						fabulousCount:3737,
						children:[{
							replyTo:'小二',
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F3c%2F12%2F4c%2F3c124c5277386c897dad2977bb964ea1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670117&t=cd32b3baf24c5b3bba4c7516bb211bfe',
							userNick:'小三',
							content:'这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
						},{
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F1f%2F4f%2F53%2F1f4f53402015d7c738e68e7fdfa4877c.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670600&t=b0fbb15006c730305ec59bbfa55d18b9',
							replyTo:'小三',
							userNick:'小四',
							content:'这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
						}]
					}]
				},
				posterUrl: 'https://img-my.csdn.net/uploads/201407/26/1406383291_6518.jpg',
				userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F39%2Fb7%2F53%2F39b75357f98675e2d6d5dcde1fb805a3.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642661023&t=dc2e75969d5509c28c65571534c2cf53'
			}, {
				id: '3',
				isFollow:1,
				isFabulous:1,
				userNick:'姚哥哥',
				videoContent:'这是一条测试',
				fabulousCount: 1,
				commentCount:1000,
				shareCount:499,
				videoUrl: 'https://v-cdn.zjol.com.cn/276984.mp4',
				commentObj:{
					count:234,
					list:[{
						userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F4e%2Ff0%2F5e4ef0e451852e0114d75eac14f60924.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642669624&t=028d851350e18512dbf4bfe3a86cbfa4',
						userNick:'小二',
						content:'这是一条测试而已',
						time:'2021-05-06 15:34:44',
						fabulousCount:3737,
						children:[{
							replyTo:'小二',
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F3c%2F12%2F4c%2F3c124c5277386c897dad2977bb964ea1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670117&t=cd32b3baf24c5b3bba4c7516bb211bfe',
							userNick:'小三',
							content:'这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
						},{
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F1f%2F4f%2F53%2F1f4f53402015d7c738e68e7fdfa4877c.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670600&t=b0fbb15006c730305ec59bbfa55d18b9',
							replyTo:'小三',
							userNick:'小四',
							content:'这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
						}]
					}]
				},
				posterUrl: 'https://img-my.csdn.net/uploads/201407/26/1406383291_8239.jpg',
				userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F39%2Fb7%2F53%2F39b75357f98675e2d6d5dcde1fb805a3.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642661023&t=dc2e75969d5509c28c65571534c2cf53'
			}, {
				id: '4',
				isFollow:1,
				isFabulous:0,
				userNick:'姚哥哥',
				videoContent:'这是一条测试',
				fabulousCount: 1,
				commentCount:1000,
				shareCount:499,
				videoUrl: 'https://v-cdn.zjol.com.cn/276985.mp4',
				commentObj:{
					count:523,
					list:[{
						userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F4e%2Ff0%2F5e4ef0e451852e0114d75eac14f60924.jpeg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642669624&t=028d851350e18512dbf4bfe3a86cbfa4',
						userNick:'小二',
						content:'这是一条测试而已',
						time:'2021-05-06 15:34:44',
						fabulousCount:3737,
						children:[{
							replyTo:'小二',
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F3c%2F12%2F4c%2F3c124c5277386c897dad2977bb964ea1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670117&t=cd32b3baf24c5b3bba4c7516bb211bfe',
							userNick:'小三',
							content:'这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
						},{
							userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F1f%2F4f%2F53%2F1f4f53402015d7c738e68e7fdfa4877c.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642670600&t=b0fbb15006c730305ec59bbfa55d18b9',
							replyTo:'小三',
							userNick:'小四',
							content:'这是一条测试而已',
							time:'2021-05-06 15:34:44',
							fabulousCount:3737,
						}]
					}]
				},
				posterUrl: 'https://img-my.csdn.net/uploads/201407/26/1406383290_9329.jpg',
				userHead:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F39%2Fb7%2F53%2F39b75357f98675e2d6d5dcde1fb805a3.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642661023&t=dc2e75969d5509c28c65571534c2cf53'
			}]
		}
	},
	onLoad() {

	},
	methods: {
		refresh(){
			console.log('松开刷新');
			this.videoData = this.videoData.splice(2,2);
		},
		loadMore(){
			console.log('加载更多');
		},
		share(video){
			uni.showToast({
				title:'分享',
				icon:'none'
			});
			console.log(video)
		},
		fabulous(video,flag){
			uni.showToast({
				title:'点赞',
				icon:'none'
			});
			console.log(video,flag)
		},
		follow(video, flag){
			console.log(video,flag)
		},
		commentFabulous(comment){
			console.log(comment)
		}
	}
}
</script>
```
```css
<style>
.content {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
```
