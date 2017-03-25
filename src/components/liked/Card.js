import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import styles from './Card.less';

const Title = ({ isAuthor }) => <h1>
	<a href="#">李莉莉</a>  {isAuthor ? '发布了活动' : '参与了活动'}
</h1>

const Content = ({ isAuthor }) => {
	if(isAuthor) {
		return <Paper style={{margin: '10px'}}>
			<CardMedia>
				<img src={require('../../assets/test.png')} />
			</CardMedia>
			<CardTitle 
				title="杨静文个人画展"
			/>
			<CardText>
				<p>
					这是活动的详细介绍这是活动的详细介绍这是活动的详细介绍按理说四行多一点就要省略
				</p>
				<h3>
					<span>2015/12/15</span>
					<span>·</span>
					<span>1256人参与</span>
				</h3>
				<a href="#">了解全部</a>
			</CardText>
		</Paper>;
	} else {
		return <Paper style={{margin: '10px'}} className="m-miniCard">
			<div className="imgWrapper">
				<img src={require('../../assets/test.png')} />
			</div>
			<div className="textWrapper">
				<h2>专业摄影师教你如何拍好柱子</h2>
				<h3>
					<Avatar src="http://lvzheyang.top/images/avatar.jpg" size={20} />
					<span>摄影师TOM</span>
					<span>·</span>
					<span>1256人参与</span>
				</h3>
			</div>
		</Paper>
	}
}

const LikedCard = ({ isAuthor=false  } ) => <div className="m-likedCard">
	<Card>
		<CardHeader 
			title={
				<Title isAuthor={isAuthor} />
			}
      subtitle="2月12日"
      avatar={
      	<Avatar src="http://lvzheyang.top/images/avatar.jpg" />
      }
		>
		</CardHeader>
		<Content isAuthor={isAuthor} />
	</Card>
</div>

export default LikedCard;