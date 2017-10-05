import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import styles from './Card.less';
import { connect } from 'dva';
import Avatar from 'material-ui/Avatar';
import { routerRedux, Link } from 'dva/router';

const IndexCard = ({ vm }) => <div className="m-IndexCard" >
  <Card>
    <CardHeader
      title={vm.organizer.name}
      avatar={<Link to={`/author?id=${vm.organizer.id}`}> <Avatar src={vm.organizer.avatar} /> </Link>}
    >
      <h2>
        <span>浏览：{vm.view_count}</span>
        <span>收藏：{vm.collectors_count}</span>
      </h2>
    </CardHeader>
    <Link to={`/detail?id=${vm.id}`} >
      <CardTitle
        title={vm.title}
      />
      <CardMedia>
        <img src={vm.image_path} />
      </CardMedia>
      <CardText>
        <h3>
          {vm.start_date}
        </h3>
        <h4>
          {vm.price}
        </h4>
      </CardText>
    </Link>
  </Card>
</div>;

export default IndexCard;
