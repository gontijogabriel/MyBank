import Image from 'next/image';
import Spin from '../../../public/spin_loading.svg'


const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image src={Spin} width={80}/>
        </div>
    );
}
export default Loading;