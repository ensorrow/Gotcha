import {Card, CardHeader, CardText} from 'material-ui/Card';
import styles from './DetailCard.less';

const DetailCard = ({ isDetail, dispatch }) => <Card className="m-detailCard">
	<CardHeader>
		<dl>
			<div>
				<dd>10</dd>
				<dt>参与的活动1</dt>
			</div>
			<div>
				<dd>10</dd>
				<dt>收藏的活动</dt>
			</div>
			<div>
				<dd>101</dd>
				<dt>我的关注</dt>
			</div>
			<div>
				<dd>1022</dd>
				<dt>我的粉丝</dt>
			</div>
		</dl>
	</CardHeader>
	<CardText style={{overflow: 'auto'}}>
		<p>
			显示三行，样式再说
		</p>
		<a>查看全部</a>
	</CardText>
</Card>

export default DetailCard;