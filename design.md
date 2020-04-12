# Design
* Type wise Default renders, overlays and overrides.
* Every configuration has a default and extra values are ignored. This is to facilitate seamless transition.
* Overlays and overrides are achieved through wrapping.
* Complex components to bare their internals for modification. IE: Have less privates.
* Presentation components do not have internal state.
* Customizable configuration for standard types. Ex: Timezone, i18n etc.
* Component config are to evolve their own DSL-s. Ex: Graphs.

# Presentation
* Flex by default.
* Flow direction of containers are often opposite to that of content.

# MVP
* Navigation and Deep Linking.
* Themes and UI Components.
* Simple table from a resource.
* Graphs.
* Platform specific components.

# Structure
* Providers
  * theme
  * i18n
  * navigation / history.
  * error handling.
* Collections and Resources.
* Contexts
  * References are resolved from the closest context, up till the global context.
  * When a name isn't resolved, it would be considered to be a literal (when no type is mentioned). This helps in deriving implicit DSL-s.
* Component Properties
  * type
  * style
  * source
  * config
* Sources
  * Local
  * Transformations
  * Remote
  * Embedded?
* Collection
  * Sorting
  * Filtering
  * Pagination
  * Actions
    * Setup. Describe. List. Limit. Order. Read. Update. Remove. Delete. Null.
* Config
  * String (registry)
  * Function (exec)
  * Object (parser)
* Standard Props
  * id
  * title
  * image
  * link
  * text
  * subText
* Standard types
  * Element
  * Range { start, end }
  * Content { title, text?, subText?, image?, link? }
  * Branch { Content, Branches: [{Branch}]}
  * Image { src }
  * Omitted
* Components
  * Container.
    * Page.
    * Box.
    * Tabs.
  * Table.
  * List (Inline).
  * Grid.
  * Graph.
  * Title and Display.
  * Navigation.
    * Bar.
    * Menu.
  * Alert.
    * Popup.
    * Toast.
  * Form.
  * Input Control.
  * Action / Button.

# Implementation
* The parser should be independent.
  * Parser
  * State Manager
  * Renderer
* A root is just an element with a store as the source and a registry for types.
  * Types are resolved from local to global.
* Most, if not all attributes should have access to sources.
* Component arguments
  * config
  * data
  * meta
  * element
* Types, Sources and Components.
* Structure, Store and Registry.
* Shared registry for components and sources.
* Utils for extension.
* Source and Target for Input controls.
* Passing the default component for overlays.
* Property names as implied types. And element is the default type.
* Platform specific components through registries.
* Massaging platform specific config before passing them to the parser.
* Collection buffers to handle writes.
* Retry / Cancel actions for failed writes.
* Config will have defaults, whenever possible. Null is used to reset defaults.
* Every config is customizable.
* Data - Meta - Config Separation for separating view data from the model.
* Sources
  * Chained.
    * Transformation.
  * Multiple.
  * Shared.
  * Inline.
  * Global
  * Local

# Pros
* Structure.
  * Decoupling Presentation and Data.
  * Language agnostic development.
  * Allows for full-stack Devs to work on the structure, where as UI Devs could focus on the skin.
* Cost effectiveness.
  * Platform agnostic.
  * Easier customization.
  * Popular and Robust components.
  * Negligible learning curve.
* Code generation.
  * Less bugs.
  * Less boilerplate.
  * Less tests.
  * Dynamic customizations.
* Testable.
* Standards.
  * Allows to follow global standards.
  * Allow to define local customizations.
  * Shared jargon helps in avoiding confusion.

# Enhancements
* Customizable internals Vs Composite components.
* Disallow state-full components through static analysis.
* Explicit dependency declaration for limiting channels?
  * Restricting contexts to predefined targets.
* Dependency resolution.
* TypeScript or some other mechanism for code completion and documentation.
* Actor Model
  * Transformation pipes, in and out, on both the  provider and the consumer.
  * Pipes. In and out. Actors. Messages. Message source. withMessaging.
  * Up and down.
  * Named actors.
  * Utils.pipe.
  * Unhandled messages are passed over.

# Pending
* Decide on allowing external subscriptions and control for the sources.
  * It might help in using the package as a plugin.
  * But the package is supposed to be a complete implementation.
  * It might meddle with the envisioned, platform independence.
