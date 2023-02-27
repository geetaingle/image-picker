
import './App.css';
import ImageSelector from './components/ImageSelector';
import Img from './assets/testplan.png'

function App() {
  return (
    <div className="App">
      <ImageSelector src={Img} />
    </div>
  );
}

export default App;
