#packet#

packet是rocui的依赖管理以及代码组织机制。使用头注解完成依赖信息的配置，使依赖与文件绑
定。packet是指一个文件——包文件，包内可以定义任意的代码，并通过全局的或CMD require风
格等方式对外暴露接口。一个包文件也是一个逻辑的完整划分单元，与其依赖的包括其他包以及
css样式表文件。

packet代码的发布形式包括Module、Option、CMD require、jQuery插件形式。包内代码都是在
闭包中运行。

特殊的包文件，Module和Option包文件，这两种文件建议只写Module或者Option定义，虽然这不是
强制的，但是为保证逻辑的简洁性，这是有必要的。而在包内的Module和Option会携带该包的包名
信息。

以CMD require风格发布的包，包内应该只包括其模块的逻辑而不应该加入其他发布形式的代码，包
名作为该require的唯一标识。并通过这个唯一标识来使用其中的逻辑。

以jQuery风格发布的代码也应该保证其代码的模块化特性。

在packet内$、module、require、Module、Option是可用的“全局”变量和属性，$是提供给
jQuery风格发布的代码使用，module和require是提供给CMD require风格发布的代码使用的。
Module和Option是为Module和Option方式发布的代码准备的。

###import###

###css###

###require###

###module###

###module.exports###

###$.require###

###global api###
