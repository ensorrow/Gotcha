import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import styles from './Card.less';
import { connect } from 'dva';
import Avatar from 'material-ui/Avatar';
import { routerRedux, Link } from 'dva/router';
import moment from 'moment';
import classnames from 'classnames';

const IndexCard = ({ vm }) => <div className="m-IndexCard" >
  <Card>
    <CardHeader
      title={<Link to={`/author?id=${vm.organizer.id}`}>{vm.organizer.name || '未命名'}</Link>}
      avatar={<Link style={{marginRight: '8px'}} to={`/author?id=${vm.organizer.id}`}> <Avatar src={vm.organizer.avatar} size={24} /> </Link>}
      titleStyle={{fontSize: '14px', color: '#3672b3', lineHeight: '24px'}}
      style={{padding: '12px'}}
    >
      <h2>
        <span>浏览：{vm.view_count}</span>·
        <span>收藏：{vm.collectors_count}</span>
      </h2>
    </CardHeader>
    <Link to={`/detail?id=${vm.id}`} >
      <CardTitle
        title={vm.title}
        style={{padding: 0}}
        titleStyle={{fontWeight: 'bold', margin: '0 0 12px 12px', fontSize: '18px', lineHeight: '18px' }}
      />
      <CardMedia 
        style={{height: '34.45vw', overflow: 'hidden'}}
      >
        <img src={vm.image_path} />
      </CardMedia>
      <CardText style={{overflow: 'auto',padding: '12px', paddingBottom: '16px'}}>
        <h3>
          {moment(vm.start_date).format('YYYY/MM/DD ddd h:mma')}
        </h3>
        <h4 className={classnames({'free': !vm.is_fee})}>
          {vm.is_fee ? <i className="icon icon-money"></i> : <i className="icon icon-free"></i>}
          {vm.is_fee ? vm.price : '免费'}
        </h4>
      </CardText>
    </Link>
  </Card>
</div>;

export default IndexCard;
