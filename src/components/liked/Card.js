import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import styles from './Card.less';

const LikedCard = ({ props  } ) => <div className="m-likedCard">
	<Card>
		<CardHeader 
			title="URL Avatar"
      subtitle="Subtitle"
      avatar="http://lvzheyang.top/images/avatar.jpg"
		>
			<h2>
				<span>浏览：230</span>
				<span>收藏：10</span>
			</h2>
		</CardHeader>
		<Card>
			<CardTitle 
				title="杨静文个人画展"
			/>
			<CardMedia>
				<img src={require('../../assets/test.png')} />
			</CardMedia>
			<CardText>
				<h3>
					<span>2015/12/15</span>
					<span>周五</span>
					<span>3:20am</span>
				</h3>
				<h4>
					13.25
				</h4>
			</CardText>
		</Card>
	</Card>
</div>

export default LikedCard;