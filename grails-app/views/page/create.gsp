<%@ page import="com.zcarioca.website.Page" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'page.label', default: 'Page')}" />
        <title><g:message code="default.create.label" args="[entityName]" /></title>
        <g:javascript library="jquery" plugin="jquery"/>
        <g:javascript library="addFile"/>
        <g:javascript>
           var number = 1;
           function addFile() {
              number = addFileUpload('uploader_section', 'image', number, 'change', addFile);
           }
        </g:javascript>
    </head>
    <body>
        <div class="nav">
            <span class="menuButton"><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></span>
            <span class="menuButton"><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></span>
        </div>
        <div class="body">
            <h1><g:message code="default.create.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <g:hasErrors bean="${pageInstance}">
            <div class="errors">
                <g:renderErrors bean="${pageInstance}" as="list" />
            </div>
            </g:hasErrors>
            <g:form action="save" enctype="multipart/form-data">
                <div class="dialog">
                    <table>
                        <tbody>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                    <label for="title"><g:message code="page.title.label" default="Title" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: pageInstance, field: 'title', 'errors')}">
                                    <g:textField name="title" maxlength="140" value="${pageInstance?.title}" />
                                </td>
                            </tr>
                            
                            <tr class="prop">
                                <td valign="top" class="name">
                                    <label for="image"><g:message code="page.attachments.label" default="Images"/></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: pageInstance, field: 'attachments', 'errors') }">
                                    <div id="uploader_section">
                                    <input onchange="addFile()" type="file" name="image.1"/>
                                    </div>
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                    <label for="content"><g:message code="page.content.label" default="Content" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: pageInstance, field: 'content', 'errors')}">
                                    <g:textArea name="content" cols="40" rows="5" value="${pageInstance?.content}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                    <label for="pageOrder"><g:message code="page.pageOrder.label" default="Page Order" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: pageInstance, field: 'pageOrder', 'errors')}">
                                    <g:textField name="pageOrder" value="${pageInstance?.pageOrder}" />
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>
                </div>
                <div class="buttons">
                    <span class="button"><g:submitButton name="create" class="save" value="${message(code: 'default.button.create.label', default: 'Create')}" /></span>
                </div>
            </g:form>
        </div>
    </body>
</html>
