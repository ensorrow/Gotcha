import { Card, CardHeader, CardText } from 'material-ui/Card';
import styles from './DetailCard.less';

const DetailCard = ({ isDetail, dispatch, vm }) => <Card className="m-detailCard">
  <CardHeader>
    <dl>
      <div>
        <dd>{vm.events_count}</dd>
        <dt>参与的活动1</dt>
      </div>
      <div>
        <dd>{vm.collect_events_count}</dd>
        <dt>收藏的活动</dt>
      </div>
      <div>
        <dd>{vm.follows_count}</dd>
        <dt>我的关注</dt>
      </div>
      <div>
        <dd>{vm.followers_count}</dd>
        <dt>我的粉丝</dt>
      </div>
    </dl>
  </CardHeader>
  <CardText style={{ overflow: 'auto' }}>
    <p>
			{vm.content || "未填写简介"}
		</p>
    <a>查看全部</a>
  </CardText>
</Card>;

export default DetailCard;