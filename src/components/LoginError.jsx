import errorSvg from '../assets/Sign up-amico.svg'
import { Button } from 'primereact/button';

const LoginError = () => {

    return (
        // <div className='DisplayImg' >
        //     <img src={errorSvg} alt="Error" />
        // </div>

        <div className="grid grid-nogutter text-800">
            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                    <span className="block text-3xl md:text-6xl font-bold mb-1">All Your Notes.</span>
                    <div className="text-2xl md:text-6xl text-primary font-bold mb-3">Organized Notes Effortless</div>
                    <p className="mt-0 mb-4 text-base md:text-700 line-height-3">Inspiration strikes anywhere. Keep Notes helps you capture and organize your ideas seamlessly across all your devices, so they are always within reach when you need them.</p>

                    <Button label="Sign Up" rounded iconPos='right' icon="pi pi-sign-in" type="button" className="mr-3 p-button-raised" />
                    {/* <Button label="Live Demo" type="button" className="p-button-outlined" /> */}
                </section>
            </div>
            <div className="col-12 md:col-6 overflow-hidden">
                <img src={errorSvg} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
            </div>
        </div>
    )
}

export default LoginError