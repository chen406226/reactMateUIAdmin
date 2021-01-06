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
						<p>1、useReducer这个Hooks在使用上几乎跟Redux/React-Redux一模一样，唯一缺少的就是无法使用redux提供的中间件。我们将上述的计数器组件改写为useReducer</p>
						<p>2、。</p>
						<p>2、</p>
						<p>子<strong>us，是一个数组，如果数组中的值变化才会触发执行useEffect第一个阐述中的函数。返回值（如果有则在组件销毁或者调用前调用）</strong></p>
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
					</div>
				</AccordionDetails>
			</Accordion>

			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="hooks" {...a11yProps(0)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<FApp/>
			</TabPanel>


		</div>
	);
}

function init(initialCount) {
	return {count: initialCount}
}

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return {count: state.count - 1}
		case 'decrement':
			return {count: state.count + 1}
		case 'reset':
			return init(action.payload)
		default:
			throw new Error()
	}
}

function FApp() {



	return (
		<div className="App">
			Count: {count}
			<button onClick={()=> clearInterval(timer)}>clear</button>
		</div>
	);
}

function Counter({initialCount}) {
	const [state, dispatch] = React.useReducer(reducer, initialCount, init)
	return (<>
	</>)
}
