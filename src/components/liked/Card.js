import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import styles from './Card.less';
import { Link } from 'dva/router';

const Title = ({ isAuthor }) => <h1>
  <a>李莉莉</a>{isAuthor ? '发布了活动' : '参与了活动'}
</h1>;

const ContentCard = ({ isAuthor, vm }) => {
  if (isAuthor) {
    return (<Paper style={{ margin: '10px' }} >
      <Link to={"/detail?id="+vm.id}>
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
          <a href="#">了解全部</a>
        </CardText>
      </Link>
    </Paper>);
  } else {
    return (<Paper style={{ margin: '10px' }} className="m-miniCard">
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

const LikedCard = ({ type, vm }) => <div className="m-likedCard" >
  <Card>
    <CardHeader
      title={
        <h1>
          李莉莉{type==='org' ? '发布了活动' : '参与了活动'}
        </h1>
			}
      subtitle={vm.start_date}
      avatar={
        <Link to={type==='org'?'/author?id='+vm.organizer.id:'/user?id='+vm.organizer.id}><Avatar src={vm.organizer.avatar || 'http://lvzheyang.top/images/avatar.jpg'} /></Link>
      }
    />
    <ContentCard vm={vm} isAuthor={type==='org'} />
  </Card>
</div>;

export default {
  LikedCard,
  ContentCard,
};
