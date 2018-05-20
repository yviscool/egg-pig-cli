# egg-pig-cli


## Installation

```bash
npm install -g egg-pig-cli
```

## Usage 

```hash
pig [command] [...options]
```

### generate (alias: g)


| Option | Description | Required | 
| - | :-: | -: | 
| type | file type | true | 
| name | file name | true | 
| path | path | false |

A list of available architecture components:

* controller (alias: co)  
* decorator (alias: d)
* filter (alias: f)
* exception (alias: e)
* guard (alias: gu)
* interceptor (alias: i)
* pipe (alias: pi)


**Example usage**

```bash
pig generate controller user
pig g co user
```


