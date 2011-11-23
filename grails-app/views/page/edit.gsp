

<%@ page import="com.zcarioca.website.Page" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'page.label', default: 'Page')}" />
        <title><g:message code="default.edit.label" args="[entityName]" /></title>
    </head>
    <body>
        <div class="nav">
            <span class="menuButton"><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></span>
            <span class="menuButton"><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></span>
            <span class="menuButton"><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></span>
        </div>
        <div class="body">
            <h1><g:message code="default.edit.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <g:hasErrors bean="${pageInstance}">
            <div class="errors">
                <g:renderErrors bean="${pageInstance}" as="list" />
            </div>
            </g:hasErrors>
            <g:form method="post" >
                <g:hiddenField name="id" value="${pageInstance?.id}" />
                <g:hiddenField name="version" value="${pageInstance?.version}" />
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
                                    <g:textField name="pageOrder" value="${fieldValue(bean: pageInstance, field: 'pageOrder')}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="attachments"><g:message code="page.attachments.label" default="Attachments" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: pageInstance, field: 'attachments', 'errors')}">
                                    
<ul>
<g:each in="${pageInstance?.attachments?}" var="a">
    <li><g:link controller="image" action="show" id="${a.id}">${a?.encodeAsHTML()}</g:link></li>
</g:each>
</ul>
<g:link controller="image" action="create" params="['page.id': pageInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'image.label', default: 'Image')])}</g:link>

                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="dateAdded"><g:message code="page.dateAdded.label" default="Date Added" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: pageInstance, field: 'dateAdded', 'errors')}">
                                    <g:datePicker name="dateAdded" precision="day" value="${pageInstance?.dateAdded}"  />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="dateModified"><g:message code="page.dateModified.label" default="Date Modified" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: pageInstance, field: 'dateModified', 'errors')}">
                                    <g:datePicker name="dateModified" precision="day" value="${pageInstance?.dateModified}"  />
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>
                </div>
                <div class="buttons">
                    <span class="button"><g:actionSubmit class="save" action="update" value="${message(code: 'default.button.update.label', default: 'Update')}" /></span>
                    <span class="button"><g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" /></span>
                </div>
            </g:form>
        </div>
    </body>
</html>
