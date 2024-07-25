import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  GridHelper,
  AxesHelper,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class BaseApp {
  private _container: HTMLDivElement;
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _control: OrbitControls;
  private _rect!: DOMRect;

  constructor(container: HTMLDivElement) {
    this._container = container;

    // Setups

    this._renderer = new WebGLRenderer({ antialias: true });
    this._renderer.domElement.style.width = "100%";
    this._renderer.domElement.style.height = "100%";
    this._container.prepend(this._renderer.domElement);

    this._scene = new Scene();

    this._camera = new PerspectiveCamera(75, 1, 0.1, 100);
    this._camera.position.set(1, 2, 1);

    this._control = new OrbitControls(this._camera, this._renderer.domElement);

    window.addEventListener("resize", this._onWindowResize);
    this._onWindowResize();

    // In scene setups

    const gridHelper = new GridHelper();
    this._scene.add(gridHelper);

    const axesHelper = new AxesHelper();
    this._scene.add(axesHelper);
  }

  public start = () => {
    this._renderer.setAnimationLoop(this._update);
  };

  public dispose = () => {
    this._renderer.setAnimationLoop(null);
    this._renderer.domElement.remove();
    this._renderer.dispose();

    window.removeEventListener("resize", this._onWindowResize);
  };

  private _update = () => {
    this._renderer.render(this._scene, this._camera);
  };

  private _onWindowResize = () => {
    this._rect = this._container.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio;

    this._camera.aspect = this._rect.width / this._rect.height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(
      this._rect.width * pixelRatio,
      this._rect.height * pixelRatio,
      false,
    );
  };
}
