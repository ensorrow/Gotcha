import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import styles from './Card.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const IndexCard = ({ data, dispatch, toDetail, toAuthor  } ) => <div className="m-IndexCard" >
	<Card>
		<CardHeader 
			title="URL Avatar"
      subtitle="Subtitle"
      avatar="http://lvzheyang.top/images/avatar.jpg"
			onClick={toAuthor}
		>
			<h2>
				<span>浏览：230</span>
				<span>收藏：10</span>
			</h2>
		</CardHeader>
		<div onClick={toDetail} >
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
		</div>
	</Card>
</div>

export default connect((state)=>{
	return {}
},function(dispatch) {
	return {
		toDetail: (params) => {
			dispatch(routerRedux.push({
				pathname: '/detail',
				params
			}));
		},
		toAuthor: (params) => {
			dispatch(routerRedux.push({
				pathname: '/author',
				params
			}));
		}
	}
})(IndexCard);