import Avatar from 'material-ui/Avatar';
import {Link} from 'dva/router';
import './Recommend.less';

const Recommend = ({title, vm, type}) => <div className="m-recommend">
  <div>
      <span className="u-title">{title}</span>
  </div>
  <div className="tj-items">
      <div style={{width: (vm.length * 238 + 188) + 'px', overflow: 'auto'}}>
          {vm.map((item, index) => <div className="tj-item" key={index}>
              <div className="line1">
                  <Avatar src={item.avatar} size={32}/>
                  <span className="name">{type == 'user' ? item.nickname : item.name}</span>
                  <span className="fav">关注</span>
              </div>
              <div className="title">{type == 'user' ? item.subscribe : item.description}</div>
              <div className="txt">{type == 'user' ? '' : item.summary}</div>
          </div>)}
          <div className="tj-item tj-item-more">
              <div className="more-red"><Link to={"/recommend/" + type}>查看全部</Link></div>
          </div>
      </div>
  </div>
</div>

export default Recommend;