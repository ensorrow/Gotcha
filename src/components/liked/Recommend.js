import Avatar from 'material-ui/Avatar';
import { Link } from 'dva/router';
import LikeButton from '../common/LikeButton';
import './Recommend.less';

const Recommend = ({ title, vm, type }) => {
  let preview;
  if (vm.length > 5) preview = vm.slice(0, 5);
  else preview = vm;
  return (<div className="m-recommend">
    <div>
      <span className="u-title">{title}</span>
    </div>
    <div className="tj-items">
      <div style={{ width: `${preview.length * 238 + 188}px`, overflow: 'auto' }}>
        {preview.map((item, index) => <div className="tj-item" key={index}>
          <div className="line1">
            <Link to={type === 'user' ? `/user?id=${item.id}` : `/author?id=${item.id}`}>
              <Avatar src={item.avatar} size={32} />
            </Link>
            <span className="name">{type == 'user' ? item.nickname : item.name}</span>
            <LikeButton id={item.id} liked={false} type={type} />
          </div>
          <div className="title">{type == 'user' ? item.subscribe : item.description}</div>
          <div className="txt">{type == 'user' ? '' : item.summary}</div>
        </div>)}
        <div className="tj-item tj-item-more">
          <div className="more-red"><Link to={`/liked/recommend/${type}`}>查看全部</Link></div>
        </div>
      </div>
    </div>
  </div>);
};

export default Recommend;
