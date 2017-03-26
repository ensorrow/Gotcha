import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import styles from './Card.less';
import { routerRedux } from 'dva/router';

function toDetail(dispatch, params) {
  dispatch(routerRedux.push({
    pathname: '/detail',
    params
  }));
}

const IndexCard = ({ dispatch  } ) => <div className="m-IndexCard" onClick={toDetail.bind(null, dispatch, {uid: 'testttttt'})} >
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
</div>

export default IndexCard;