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
					<Typography className={classes.heading}>useState 保存组件状态</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<p>1、上面介绍了useState、useEffect这两个最基本的API，接下来介绍的useContext是React帮你封装好的，用来处理多层级传递数据的方式，在以前组件树中，跨层级祖先组件想给子孙组件传递数据的时候，除了一层层props往下透传之外，我们还可以使用React Context API 来帮我们做这件事， 举个简单例子</p>
						<p><pre>
							{`
								const { Provider, Consumer } = React.createContext(null)
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
						</pre></p>
						<p>2、</p>
						<p><strong></strong></p>
						<ul>
							<li>比如第一个useEffect中，理解起来就是一旦count值发生改变，则修改document.title的值</li>
							<li><pre>
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
							</pre></li>
							<li>而第二个useEffect中传递一个空数组[],这种情况下只有在组件初始化或销毁的时候才会触发，用来代替componentDidMount和componentWillUnmount,慎用</li>
							<li>还有一种情况，就是不传递第二个参数，也就是useEffect只接受了第一个函数参数，代表不监听任何参数变化，每次渲染DOM之后，都会执行useEffect中的函数。基于这个强大的hooks,我们可以模拟封装出其他生命周期函数，比如componentDidUpdate</li>
							<li>
								<pre>
									{`
										const { Provider, Consumer } = React.createContext(null)
										function Bar() {
											return <Consumer>{color => <div>{color}</div>}</Consumer>
										}
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


const { Provider, Consumer } = React.createContext(null);
function Bar() {
	return <Consumer>{color => <div>{color}</div>}</Consumer>;
}
function Foo() {
	return <Bar />;
}

function CApp () {
	return (
		<Provider value={"grey"}>
			<Foo />
		</Provider>
	);
}

let timer

function FApp() {
	const [count, setCount] = React.useState(0)

	React.useEffect(() => {
		document.title = 'componentDidMount' + count
	},[count])

	// React.useEffect(() => {
	// 	document.title = 'componentDidUpdate' + count
	// })

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

