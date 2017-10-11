import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import styles from './Card.less';
import { Link } from 'dva/router';
import moment from 'moment';

const ContentCard = ({ isAuthor, vm }) => {
  if (isAuthor) {
    return (<Paper style={{ margin: '10px' }} >
      <CardMedia>
        <img src={vm.image_path || require('../../assets/test.png')} />
      </CardMedia>
      <CardTitle
        title={vm.title}
      />
      <CardText>
        <p>
          {vm.description}
        </p>
        <h3>
          <span>{vm.start_date}</span>
          <span>·</span>
          <span>{vm.users_count || 0}人参与</span>
        </h3>
        <Link to={"/detail?id="+vm.id}>了解全部</Link>
      </CardText>
    </Paper>);
  } else {
    return (<Paper className="m-miniCard">
      <Link to={"/detail?id="+vm.id}>      
        <div className="imgWrapper">
          <img src={vm.image_path || require('../../assets/test.png')} />
        </div>
        <div className="textWrapper">
          <h2>{vm.title}</h2>
          <h3>
            <Avatar src={vm.organizer.avatar || 'http://lvzheyang.top/images/avatar.jpg'} size={20} />
            <span>{vm.organizer.name}</span>
            <span>·</span>
            <span>{vm.users_count || 0}人参与</span>
          </h3>
        </div>
      </Link>
    </Paper>);
  }
};

const LikedCard = ({ vm }) => <div className="m-likedCard" >
  <Card style={{paddingBottom: '24px'}}>
    <CardHeader
      title={
        <h1>
          {!vm.user ? <span>{vm.organizer.name}</span> : <span>{vm.user.nickname}</span>}
          {!vm.user ? '发布了活动' : '参与了活动'}
        </h1>
			}
      subtitle={vm.event.start_date}
      avatar={
        <Link to={!vm.user?'/author?id='+vm.organizer.id:'/user?id='+vm.user.id}><Avatar size={36} src={vm.user.avatar || vm.organizer.avatar || 'http://lvzheyang.top/images/avatar.jpg'} /></Link>
      }
    />
    <ContentCard vm={vm.event} isAuthor={!vm.user} />
  </Card>
</div>;

export default {
  LikedCard,
  ContentCard,
};
