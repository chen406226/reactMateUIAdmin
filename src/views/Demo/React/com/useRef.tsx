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
import {useEffect, useRef, useState} from "react";

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
					<Typography className={classes.heading}>UseRef 保存引用值</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<p>1、useRef跟createRef类似，都可以用来生成对DOM对象的引用，看个简单的例子：</p>
						<p><pre>
							{`
								function App () {
									let [name, setName] = useState('Nate')
									let nameRef = useRef(null)
									const submitButton = () => {
										setName(nameRef.current.value)
									}
									return (<div className="App">
										<p>Name:{name}</p>
										<div>
											<input type="text" ref={nameRef}>
											<button type="button" onClick={submitButton}>Submit</button>
										</div>
									</div>)
								}
							`}
						</pre></p>
						<p>useRef返回的值传递给组件或者DOM的ref属性，就可以通过ref.current值<strong>访问组件或真实的DOM节点，重点是组件也是可以访问到的</strong>，从而可以对DOM进行一些操作，比如监听事件等等。</p>
						<p>当然useRef远比你想象中的功能更加强大，useRef的功能有点像类属性，或者说您想要在组件中记录一些值，并且这些值在稍后可以更改。</p>
						<p>利用useRef就可以绕过Capture Value的特性。可以认为ref在所有Render过程中保持着唯一引用，因此所有对ref的赋值或取消，拿到的都只有一个最终状态，而不会在每个Render间存在隔离。参考例子：精度《Function VS Class 组件》</p>
						<p>React Hooks 中存在 Capture Value的特性：</p>
						<p><pre>
							{`
								function App {
  								const [count, setCount] = useState(0)
  								useEffect(() => {
  								  setTimeout(()=>{
  								  	alert('count:' + count)
  								  },3000)
  								}, [count]);
  								
  								return (<div>
  									<p>You clicked {count} times</p>
  									<button onClick={() => {setCount(count + 1)}}>增加count</button>
  									<button onClick={() => {setCount(count - 1)}}>减少count</button>
									</div>)
								}
							`}
						</pre></p>
						<p>在点击增加button，后点击减少button，3s后先alert1,后alert0，而不是alert两次0，这就是所谓的capture value的特性。而在<strong>类组件中</strong>3s后输出就是修改后的值，因为这时候**message是挂在在this变量上，他保留的是一个引用值××，对this属性的访问都会获取到最新的值，类组件举例，在线Demo。讲到这里你应该明白了，useRef创建一个引用，就可以有效规避React Hooks中Capture Value特性。useRef避免Capture Value</p>
						<p><pre>
							{`
								function App() {
  								const count = useRef(0)
  								const showCount = () => {alert(count.current, 'count.current')}
									const handleClick = (number) => {
  								  count.current = count.current + number
  								  setTimeout(showCount, 3000)
									}
									return (<div>
										<p>You clicked {count.current} times</p>
										<button onClick={()=>{handleClick(1)}}>增加count</button>
										<button onClick={()=>{handleClick}}>减少count</button>
									</div>)
								}
							`}
						</pre></p>
						<p>只要将赋值与取值的对象变成useRef，而不是useState，就可以躲过capture Value特性， 在3s后得到最新的值</p>
						<h2>useImperativeHandle 透传Ref</h2>
						<p>通过useImperativeHandle用于让父组件获取子组件内的索引</p>
						<p><pre>
							{`
								function ChildInputComponent(props, ref) {
  								const inputRef = useRef(null)
  								useImperativeHandle(
  								  ref,
  								  () => inputRef.current,
  								);
  								
									return (<input type="text" name="child input" ref={inputRef}/>)
								}
								const ChildInput = React.forwardRef(ChildInputComponent)
								function App() {
  								const ref = useRef(null)
  								useEffect(() => {
  								  ref.current.focus()
  								}, []);
  								
								  return (<div><ChildInput ref={ref}></div>)
								}
								// React 官方示例
								function FancyInput(props, ref){
								  const inputRef = useRef();
								  useImperativeHandle(
								    ref,
								    () => ({
								      focus: () => {inputRef.current.focus()}
								    }),
								  )
								  return <input ref={inputRef}/>
								}
								FancyInput = forwardRef(FancyInput)
								
							`}
						</pre></p>
						<p>在本例中，渲染&lt;FancyInput ref="inputRef“ / &gt;的父组件可以调用inputRef.current.focus()</p>
					</div>
				</AccordionDetails>
			</Accordion>

			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="refInput" {...a11yProps(0)} />
					<Tab label="Capture" {...a11yProps(1)} />
					<Tab label="去除Capture" {...a11yProps(2)} />
					<Tab label="Ref父操作子" {...a11yProps(3)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<FApp/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<CountApp/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<CaptureCountApp/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<PuseC/>
			</TabPanel>

		</div>
	);
}

function FApp() {
	const [name, setName] = React.useState('Nate')
	let nameRef = React.useRef<any>(null)
	const submitButton = () => {
		setName(nameRef.current.value)
	}

	return (
		<div className="App">
			<p>Name:{name}</p>
			<div>
				<input ref={nameRef} type="text"/>
				<button type="button" onClick={submitButton}>Submit</button>
			</div>
		</div>
	);
}
function CountApp() {
	const [count, setCount] = React.useState(0)
	useEffect(() => {
		setTimeout(() => {
			console.log(count, 'count')
		},3000)
	}, [count])
	return (<div>
		<p>{`you clicked ${count} times`}</p>
		<button onClick={() => {setCount(count + 1)}}>增加count</button>
		<button onClick={() => {setCount(count - 1)}}>减少count</button>
	</div>)
}
function CaptureCountApp() {
	const count = React.useRef(0)
	const showCount = () => {console.log(count.current,'showCount')}
	const handleClick = number => {
		count.current = count.current + number
		setTimeout(showCount, 3000)
	}
	return (<div>
		<p>You clicked {count.current} times</p>
		<button onClick={()=>{handleClick(1)}}>增加count</button>
		<button onClick={()=>{handleClick(-1)}}>减少count</button>
	</div>)
}


function ChildInputComponent(props, ref) {
	const inputRef = React.useRef(null)
	React.useImperativeHandle(ref, () => inputRef.current)
	return (<input type="text" name="child input" ref={inputRef}></input>)
}
const ChildInput = React.forwardRef(ChildInputComponent)
function PuseC() {
	const inputRef = React.useRef(null)
	React.useEffect(() => {
		inputRef.current.focus()
	}, [])
	return (<div>
		<ChildInput ref={inputRef}></ChildInput>
	</div>)
}
