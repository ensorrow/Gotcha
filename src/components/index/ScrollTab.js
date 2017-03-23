import styles from './ScrollTab.less';

const ScrollTab = ({ props  } ) => <div className="m-scrollTab">
	<ul>
		<li>
			<a href="#">全部</a>
		</li>
		<li>
			<a href="#">热门</a>
		</li>
		<li>
			<a href="#">朋友</a>
		</li>
		<li>
			<a href="#">美食</a>
		</li>
		<li>
			<a href="#">音乐</a>
		</li>
		<li>
			<a href="#">户外</a>
		</li>
	</ul>
</div>

export default ScrollTab;