# assets

Editable source files for artwork that ships as a rendered image.

Nothing in here is published. These files live outside `public/` on purpose:
everything under `public/` is copied verbatim into the deployed package, so
source artifacts placed there get uploaded to the CDN even though no page ever
requests them.

- `diagrams/` — [Dia](https://wiki.gnome.org/Apps/Dia) sources for the
  Kubernetes diagrams. The exported `.svg` files they produce live in
  `public/docs/deployments/kubernetes/`.
