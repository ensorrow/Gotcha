import styles from './ScrollTab.less';

const ScrollTab = ({ tabs, onTab, active }) => {
  tabs[0] && tabs[0].id !== 0 && tabs.unshift({ id: 0, name: '全部' });
  return (<div className="m-scrollTab">
    <div className="carousel-scroller" id="tab-scroller">
      {tabs && tabs.map(item => <span className={`tab ${active === item.name ? 'active' : ''}`} key={item.id} onClick={onTab.bind(null, item.name)}>{item.name}</span>)}
    </div>
  </div>);
};

export default ScrollTab;
