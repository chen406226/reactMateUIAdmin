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
					<Typography className={classes.heading}>UseMeomo 记忆组件</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<p>1、useCallback的功能完全可以由useMemo所取代，如果你想通过使用useMemo返回一个记忆函数也是完全可以的</p>
						<p><pre>
							{`useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).`}
						</pre></p>
						<p>所以前面使用useCallback的例子可以用useMemo改写：</p>
						<p><pre>
							{`
								function App {
									const memoizedHandler = useMemo(() => () => {console.log()}, [])
									return (<SomeComponent onClick={memoizedHandler}></SomeComponent>)
								}
							`}
						</pre></p>
						<p>唯一的区别是：<strong>useCallback不会执行第一个参数函数，而是将它返回给你，而useMemo会执行第一个函数并且将函数执行结果返回给你。</strong>所以在前面的例子中，可以返回handleClick来达到存储函数的目的</p>
						<p>所以useCallback常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用，而useMemo更适合经过函数计算得到一个确定的值，比如记忆组件</p>
						<p><pre>
							{`
								function Parent({a, b}) {
									// only re-rendered if 'a' changes:
									const child1 = useMemo(() => <Child1 a={a}/>, [a])
									// only re-rendered if 'b' changes:
									const child2 = useMemo(() => <Child2 b={b}/>, [b])
								  return (<>
								  	{child1}
								  	{child2}
								  </>)
								}
							`}
						</pre></p>
						<p>当a/b改变时，child1/child2才会重新渲染。从例子可以看出来，只有在第二个参数数组的值发生变化时，才会触发子组件的更新</p>
					</div>
				</AccordionDetails>
			</Accordion>

		</div>
	);
}
