import {
  Scene,
  Color,
  PerspectiveCamera,
  WebGLRenderer,
  XRTargetRaySpace,
  XRGripSpace,
  Mesh,
  BoxGeometry,
  HemisphereLight,
  BufferGeometry,
  Vector3,
  Line,
  IcosahedronGeometry,
  DirectionalLight,
  ConeGeometry,
  CustomBlending,
  CylinderGeometry,
  Group,
  MeshStandardMaterial,
  PlaneGeometry,
  ShadowMaterial,
  TorusGeometry,
  Raycaster,
} from "three";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { XRButton } from "three/addons/webxr/XRButton.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class DraggingApp {
  private _container: HTMLDivElement;
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _renderer: WebGLRenderer;
  private _rect!: DOMRect;
  private _controller1!: XRTargetRaySpace;
  private _controller2!: XRTargetRaySpace;
  private _controllerGrip1!: XRGripSpace;
  private _controllerGrip2!: XRGripSpace;
  private _group!: Group;
  private _intersected: Mesh<BufferGeometry, MeshStandardMaterial>[] = [];
  private _raycaster!: Raycaster;

  constructor(container: HTMLDivElement) {
    this._container = container;

    this._scene = new Scene();
    this._scene.background = new Color(0x808080);

    this._camera = new PerspectiveCamera(50, 1, 0.1, 50);
    this._camera.position.set(0, 1.6, 5);

    this._renderer = new WebGLRenderer({ antialias: true });
    this._renderer.domElement.style.width = "100%";
    this._renderer.domElement.style.height = "100%";
    this._container.prepend(this._renderer.domElement);
    this._renderer.xr.enabled = true;
    this._renderer.shadowMap.enabled = true;

    this._container.append(
      XRButton.createButton(this._renderer, {
        optionalFeatures: ["depth-sensing"],
        depthSensing: {
          usagePreference: ["gpu-optimized"],
          dataFormatPreference: [],
        },
      }),
    );

    window.addEventListener("resize", this._onWindowResize);
    this._onWindowResize();

    this._initScene();
    this._initControllers();
    this._initOrbitControls();
  }

  private _initScene = () => {
    const floorGeometry = new PlaneGeometry(6, 6);
    const floorMaterial = new ShadowMaterial({
      opacity: 0.6,
      blending: CustomBlending,
      transparent: false,
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this._scene.add(floor);

    this._scene.add(new HemisphereLight(0xbcbcbc, 0xa5a5a5, 3));

    const light = new DirectionalLight(0xffffff, 3);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    light.shadow.camera.top = 3;
    light.shadow.camera.bottom = -3;
    light.shadow.camera.right = 3;
    light.shadow.camera.left = -3;
    light.shadow.mapSize.set(4096, 4096);
    this._scene.add(light);

    this._group = new Group();
    this._scene.add(this._group);

    const geometries = [
      new BoxGeometry(0.2, 0.2, 0.2),
      new ConeGeometry(0.2, 0.2, 64),
      new CylinderGeometry(0.2, 0.2, 0.2, 64),
      new IcosahedronGeometry(0.2, 8),
      new TorusGeometry(0.2, 0.04, 64, 32),
    ];

    for (let i = 0; i < 50; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        roughness: 0.7,
        metalness: 0.0,
      });

      const object = new Mesh(geometry, material);

      object.position.x = Math.random() * 4 - 2;
      object.position.y = Math.random() * 2;
      object.position.z = Math.random() * 4 - 2;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      object.scale.setScalar(Math.random() + 0.5);

      object.castShadow = true;
      object.receiveShadow = true;

      this._group.add(object);
    }
  };

  private _initControllers = () => {
    this._controller1 = this._renderer.xr.getController(0);
    this._controller1.addEventListener("selectstart", this.onSelectStart);
    this._controller1.addEventListener("selectend", this.onSelectEnd);
    this._scene.add(this._controller1);

    this._controller2 = this._renderer.xr.getController(1);
    this._controller2.addEventListener("selectstart", this.onSelectStart);
    this._controller2.addEventListener("selectend", this.onSelectEnd);
    this._scene.add(this._controller2);

    const controllerModelFactory = new XRControllerModelFactory();

    this._controllerGrip1 = this._renderer.xr.getControllerGrip(0);
    this._controllerGrip1.add(
      controllerModelFactory.createControllerModel(this._controllerGrip1),
    );
    this._scene.add(this._controllerGrip1);

    this._controllerGrip2 = this._renderer.xr.getControllerGrip(1);
    this._controllerGrip2.add(
      controllerModelFactory.createControllerModel(this._controllerGrip2),
    );
    this._scene.add(this._controllerGrip2);

    const geometry = new BufferGeometry().setFromPoints([
      new Vector3(0, 0, 0),
      new Vector3(0, 0, -1),
    ]);

    const line = new Line(geometry);
    line.name = "line";
    line.scale.z = 5;

    this._controller1.add(line.clone());
    this._controller2.add(line.clone());

    this._raycaster = new Raycaster();
  };

  private _initOrbitControls = () => {
    const controls = new OrbitControls(this._camera, this._renderer.domElement);
    controls.maxDistance = 10;
    controls.target.set(0, 1.6, 0);
    controls.update();
  };

  private _getIntersections = (controller: XRTargetRaySpace) => {
    controller.updateMatrixWorld();

    this._raycaster.setFromXRController(controller);

    return this._raycaster.intersectObjects(this._group.children, false);
  };

  private _intersectObjects = (controller: XRTargetRaySpace) => {
    // Do not highlight in mobile-ar

    if (controller.userData.targetRayMode === "screen") return;

    // Do not highlight when already selected

    if (controller.userData.selected !== undefined) return;

    const line = controller.getObjectByName("line")!;
    const intersections = this._getIntersections(controller);

    if (intersections.length > 0) {
      const intersection = intersections[0];

      const object = intersection.object as Mesh<
        BufferGeometry,
        MeshStandardMaterial
      >;
      object.material.emissive.r = 1;
      this._intersected.push(object);

      line.scale.z = intersection.distance;
    } else {
      line.scale.z = 5;
    }
  };

  private _cleanIntersected = () => {
    while (this._intersected.length) {
      const object = this._intersected.pop();

      if (object) {
        object.material.emissive.r = 0;
      }
    }
  };

  private onSelectStart(event: { target: XRTargetRaySpace }) {
    const controller = event.target;

    const intersections = this._getIntersections(controller);

    if (intersections.length > 0) {
      const intersection = intersections[0];

      const object = intersection.object as Mesh<
        BufferGeometry,
        MeshStandardMaterial
      >;
      object.material.emissive.b = 1;
      controller.attach(object);

      controller.userData.selected = object;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controller.userData.targetRayMode = (event as any).data.targetRayMode;
  }

  private onSelectEnd(event: { target: XRTargetRaySpace }) {
    const controller = event.target;

    if (controller.userData.selected !== undefined) {
      const object = controller.userData.selected;
      object.material.emissive.b = 0;
      this._group.attach(object);

      controller.userData.selected = undefined;
    }
  }

  private _render = () => {
    this._cleanIntersected();

    this._intersectObjects(this._controller1);
    this._intersectObjects(this._controller2);

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

  // Public methods

  public start = async () => {
    this._renderer.setAnimationLoop(this._render);
  };

  public dispose = () => {
    this._renderer.setAnimationLoop(null);
    this._renderer.domElement.remove();
    this._renderer.dispose();

    window.removeEventListener("resize", this._onWindowResize);
  };
}
