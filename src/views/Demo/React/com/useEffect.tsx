import * as React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	heading: {
		fontSize: '14px'
	}
}));

export default function SimpleTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>useEffect处理副作用</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<p>1、函数组件能保存状态，但是对于异步请求，副作用的操作还是无能为力，所以React提供了useEffect来帮助开发者处理函数组件的副作用，在介绍新API之前，我们先看看类组件是怎么做的：</p>
						<p>2、在class例子中，组件每隔1S更新组件状态，并且每次更新都会出发document.title的更新（副作用），而在组件卸载时修改document.title(类似清除)。</p>
						<p>2、在例子中可以看到，一些重复的功能开发者需要在componentDidMount和componentDidUpdate重复编写，而如果使用useEffect则完全不一样</p>
						<p>我们使用useEffect重写了上面的例子<strong>useEffect第一个参数接受一个函数，可以用来做一些副作用比如异步请求，修改外部参数等行为，而第二个参数称之为dependencies，是一个数组，如果数组中的值变化才会触发执行useEffect第一个阐述中的函数。返回值（如果有则在组件销毁或者调用前调用）</strong></p>
						<ul>
							<li>比如第一个useEffect中，理解起来就是一旦count值发生改变，则修改document.title的值</li>
							<li>而第二个useEffect中传递一个空数组[],这种情况下只有在组件初始化或销毁的时候才会触发，用来代替componentDidMount和componentWillUnmount,慎用</li>
							<li>还有一种情况，就是不传递第二个参数，也就是useEffect只接受了第一个函数参数，代表不监听任何参数变化，每次渲染DOM之后，都会执行useEffect中的函数。基于这个强大的hooks,我们可以模拟封装出其他生命周期函数，比如componentDidUpdate</li>
							<li>
								<pre>
									{`
										function useUpdate(fn) {
											// useRef 创建一个引用
											const mounting = useRef(true)
											useEffect(() => {
												if (mounting.current) {
													mounting.current = false
												} else {
													fn()
												}
											})
										}
									`}
								</pre>
							</li>
							<li>现在我们有了useState管理状态,useEffect处理副作用，异步逻辑，学会这两招足以应对大部分类组件的使用场景</li>
						</ul>
						<h2>useLayoutEffect 同步执行副作用</h2>
						<p>大部分情况下，使用useEffect就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对DOM的操作，就需要使用useLayoutEffect,useLayoutEffect中的副作用会在DOM更新之后同步执行</p>
						<p><pre>
							{`
								function App() {
									const [width, setWidth] = useState(0)
									useLayoutEffect(()=>{
										const title = document.querySelector('#title')
										const titleWidth = title.getBoundingClientRect().width
										console.log('useLayoutEffect')
										if (width != titleWidth) {
											setWidth(titleWidth)
										}
									})
									useEffect(()=>{console.log('useEffect')})
									return (<div>
										<h1 id="title">hello</h1>
										<h1>{width}</h1>
									</div>)
								}
							`}
						</pre></p>
						<p>在上面的例子中，useLayoutEffect会在render,DOM更新之后同步触发函数，会优于useEffect异步触发函数。</p>
						<h3>useEffect和useLayoutEffect有什么区别</h3>
						<p><strong>简单来说就是调用时机不同，useLayoutEffect和原来componentDidMount&componentDidUpdate一致，在react完成DOM更新后马上同步调用的代码，会阻塞页面渲染。而useEffect是会在整个页面渲染完才会调用的代码</strong></p>
						<p>官方建议优先使用useEffect</p>
						<p><pre>However， <strong>we recommend starting with useEffect first and only trying useLayoutEffect if that causes a problem.</strong></pre></p>
						<p>在实际使用时如果想避免<strong>页面抖动</strong>（在useEffect里修改DOM很有可能出现）的话，可以把需要操作DOM的代码放在useLayoutEffect。关于适用UseEffect导致页面抖动，参考git仓库示例</p>
						<p>不过useLayoutEffect在服务端渲染时会出现一个warning，要消除的话得用useEffect代替或者推迟渲染时机。</p>
						<p>其函数签名与useEffect相同，但他会在所有的DOM变更之后同步调用effect。可以使用它来读取DOM布局并同步出发重渲染。在浏览器执行绘制前，useLayoutEffect内部的更新计划将被同步刷新。尽可能使用标准的useEffect以避免视觉更新</p>
					</div>
				</AccordionDetails>
			</Accordion>

			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="类组件" {...a11yProps(0)} />
					<Tab label="hooks" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<CApp/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<FApp/>
			</TabPanel>

		</div>
	);
}

interface cAppState {
	count: any,
}

class CApp extends React.Component <any, cAppState> {
	timer: any
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};
	}
	componentDidMount() {
		const {count} = this.state
		document.title = 'componentDidMount' + count
		this.timer = setInterval(() => {
			this.setState(({count}) => ({count: count + 1}))
		}, 1000)
	}
	componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<cAppState>, snapshot?: any) {
		const {count} = this.state
		document.title = 'componentDidUpdate' + count
	}
	componentWillUnmount() {
		document.title = 'componentWillUnmount'
		clearInterval(this.timer)
	}

	render() {
		const {count: count} = this.state;
		return (
			<div>
				Count: {count}
				<button onClick={() => clearInterval(this.timer)}>clear</button>
			</div>
		);
	}
}

let timer

function FApp() {
	const [count, setCount] = React.useState(0)

	React.useEffect(() => {
		document.title = 'componentDidMount' + count
	},[count])

	React.useEffect(() => {
		// document.title = 'componentDidUpdate' + count
		console.log('this is effect')
	})
	React.useLayoutEffect(()=>{console.log('this is useLayoutEffect')})

	React.useEffect(() => {
		timer = setInterval(() => {
			setCount(prevCount => prevCount + 1)
		}, 1000)
		// 注意下这个顺序
		// 告诉react在下次重新渲染组件之后，同时是下次执行上面setInterval之前调用
		return ()=>{
			document.title = 'coumponentWillUnmountEffect'
			clearInterval(timer)
		}
	},[])

	return (
		<div className="App">
			Count: {count}
			<button onClick={()=> clearInterval(timer)}>clear</button>
		</div>
	);
}

