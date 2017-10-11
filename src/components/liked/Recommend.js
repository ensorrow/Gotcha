import Avatar from 'material-ui/Avatar';
import { Link } from 'dva/router';
import LikeButton from '../common/LikeButton';
import './Recommend.less';

const Recommend = ({ title, vm, type }) => {
  let preview;
  if (vm.length > 5) preview = vm.slice(0, 5);
  else preview = vm;
  return (<div className="m-recommend">
    <h1 className="title"><span>{title}</span> <Link to={`/liked/recommend/${type}`}>查看全部</Link></h1>
    <div className="tj-items">
      <div style={{ width: `${preview.length * 66.1 + 52.1}vw`, overflow: 'auto', paddingBottom: '3px' }}>
        {preview.map((item, index) => <div className="tj-item" key={index}>
          <div className="line1">
            <Link to={type === 'user' ? `/user?id=${item.id}` : `/author?id=${item.id}`}>
              <Avatar src={item.avatar} size={32} />
            </Link>
            <span className="name">{type == 'user' ? item.nickname || '未命名' : item.name || '未命名'}</span>
            <LikeButton id={item.id} liked={item.has_follow} type={type} />
          </div>
          <h2>{type == 'user' ? item.subscribe || '暂无相关信息' : item.description || '暂无相关信息'}</h2>
          <h3>{type == 'user' ? '' : item.summary || '这是一个神秘的主办方'}</h3>
        </div>)}
        <div className="tj-item tj-item-more">
          <Link to={`/liked/recommend/${type}`} className="u-more">查看全部</Link>
        </div>
      </div>
    </div>
  </div>);
};

export default Recommend;
